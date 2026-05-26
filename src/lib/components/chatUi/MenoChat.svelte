<script lang="ts">
    import { ArrowUpRightSquareIcon, X } from "lucide-svelte";
    import BotAvatar from "./BotAvatar.svelte";
    import LinkCard from "./LinkCard.svelte";
    import { tick, onMount } from "svelte";
    import { marked } from "marked";

    type ChatMessage = { id: number; role: "user" | "bot"; content: string };

    marked.setOptions({ breaks: true, gfm: true });
    const renderMarkdown = (text: string) => marked.parse(text) as string;

    // pull unique http(s) links out of a reply (trailing punctuation stripped)
    function extractUrls(text: string): string[] {
        const matches = text.match(/https?:\/\/[^\s<>"')\]]+/g) ?? [];
        const cleaned = matches.map((u) => u.replace(/[.,;:]+$/, ""));
        return [...new Set(cleaned)];
    }

    const GREETING: ChatMessage = {
        id: 0,
        role: "bot",
        content:
            "Hey! I'm Meno, Harsh's portfolio assistant. Ask me anything about his work.",
    };
    let messages = $state<ChatMessage[]>([GREETING]);

    let { showChatMenu = $bindable() } = $props();
    let loading = $state(false);
    let streaming = $state(false);
    let streamingId = $state<number | null>(null); // bot msg currently being typed
    let input = $state("");
    let scrollEl = $state<HTMLElement | null>(null);

    // base URL of the backend (set VITE_CHAT_API_URL in .env)
    const API_BASE = import.meta.env.VITE_CHAT_API_URL ?? "";

    let nextId = 1;

    // one stable id per visitor, persisted so the backend can group the conversation
    function getVisitorId(): string {
        let id = localStorage.getItem("chat_visitor_id");
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("chat_visitor_id", id);
        }
        return id;
    }

    // pull any prior conversation for a returning visitor and render it
    async function loadHistory() {
        const visitorId = localStorage.getItem("chat_visitor_id");
        if (!visitorId) return; // brand-new visitor — nothing to load

        try {
            const res = await fetch(
                `${API_BASE}/api/v1/ai/about-me/messages?visitorId=${encodeURIComponent(visitorId)}`,
            );
            if (!res.ok) return;

            const data = await res.json();
            const history: Array<{ role: string; content: string }> =
                data.messages ?? data ?? [];

            const mapped: ChatMessage[] = history.map((m) => ({
                id: nextId++,
                role: m.role === "user" ? "user" : "bot",
                content: m.content,
            }));

            if (mapped.length) {
                messages = [GREETING, ...mapped];
                scrollDown();
            }
        } catch {
            // history is best-effort; ignore failures
        }
    }

    onMount(loadHistory);

    async function scrollDown() {
        await tick();
        scrollEl?.scrollTo({ top: scrollEl.scrollHeight, behavior: "smooth" });
    }

    async function sendMessage() {
        const question = input.trim();
        if (!question || loading) return;

        messages.push({ id: nextId++, role: "user", content: question });
        input = "";
        loading = true;
        streaming = false;
        scrollDown();

        let botIndex = -1; // index of the assistant bubble once it exists

        try {
            const res = await fetch(`${API_BASE}/api/v1/ai/about-me`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ visitorId: getVisitorId(), question }),
            });

            if (!res.ok || !res.body) {
                throw new Error(`Request failed: ${res.status}`);
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });

                // frames are separated by a blank line; keep the incomplete tail
                const frames = buffer.split("\n\n");
                buffer = frames.pop() ?? "";

                for (const frame of frames) {
                    const event = frame.match(/^event: (.+)$/m)?.[1];
                    const data = frame.match(/^data: (.+)$/m)?.[1];
                    if (!data) continue;
                    const parsed = JSON.parse(data);

                    if (event === "chunk") {
                        // first chunk: create the bubble, then grow it
                        if (botIndex === -1) {
                            const botId = nextId++;
                            messages.push({ id: botId, role: "bot", content: "" });
                            botIndex = messages.length - 1;
                            streamingId = botId;
                            streaming = true;
                        }
                        messages[botIndex].content += parsed.text;
                        scrollDown();
                    } else if (event === "error") {
                        throw new Error(parsed.message ?? "Stream error");
                    }
                    // "done" needs no action — the loop ends when the stream closes
                }
            }
        } catch (err) {
            const msg =
                err instanceof Error ? err.message : "Something went wrong.";
            if (botIndex === -1) {
                messages.push({ id: nextId++, role: "bot", content: msg });
            } else {
                messages[botIndex].content += `\n\n⚠️ ${msg}`;
            }
        } finally {
            loading = false;
            streaming = false;
            streamingId = null;
            scrollDown();
        }
    }

    function handleKeys(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }
</script>

<div
    class="h-[min(70vh,580px)] w-[min(92vh,380px)] flex flex-col rounded-2xl bg-neutral-100 shadow-2xl overflow-hidden fixed right-4 bottom-20 origin-bottom-right transition-all duration-300 selection:bg-blue-500 selection:text-white {showChatMenu
        ? 'scale-100 opacity-100'
        : 'scale-0 opacity-0'}"
>
    <div
        aria-label="chat-header"
        class="flex gap-2 justify-between items-center p-4 bg-neutral-900 h-16 text-white"
    >
        <div><BotAvatar /></div>
        <div class="flex-1 text-start">Ask Meno</div>
        <button aria-label="Close chat" onclick={() => (showChatMenu = false)}
            ><X /></button
        >
    </div>
    <div
        aria-label="chat-chatSection"
        data-lenis-prevent
        class="flex-1 overflow-y-auto min-h-0 overscroll-contain space-y-3 p-4"
        bind:this={scrollEl}
    >
        {#each messages as message (message.id)}
            <div
                class="flex {message.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'} "
            >
                <div
                    class="rounded-2xl text-sm py-2 px-3 max-w-[82%] selection:bg-blue-500 selection:text-white {message.role ===
                    'user'
                        ? 'bg-neutral-900 text-white rounded-br-md'
                        : 'bg-white text-neutral-800 shadow-sm rounded-bl-md'}"
                >
                    {#if message.role === "user"}
                        <span class="whitespace-pre-wrap">{message.content}</span>
                    {:else}
                        <div
                            class="prose prose-sm prose-neutral max-w-none wrap-break-word prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-headings:my-2 prose-pre:my-2 prose-pre:bg-neutral-100 prose-pre:text-neutral-800 prose-code:text-neutral-800 prose-a:text-blue-600"
                        >
                            {@html renderMarkdown(message.content)}
                        </div>
                        {#if message.id !== streamingId}
                            {#each extractUrls(message.content) as url (url)}
                                <div class="mt-2">
                                    <LinkCard {url} />
                                </div>
                            {/each}
                        {/if}
                    {/if}
                </div>
            </div>
        {/each}
        {#if loading && !streaming}
            <div class="flex justify-start">
                <div
                    class="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm"
                >
                    <span
                        class="size-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]"
                    ></span>
                    <span
                        class="size-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]"
                    ></span>
                    <span
                        class="size-1.5 animate-bounce rounded-full bg-neutral-400"
                    ></span>
                </div>
            </div>
        {/if}
    </div>
    <div
        class="m-3 flex items-end gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 shadow-sm transition focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-neutral-900/5"
    >
        <textarea
            rows="1"
            placeholder="Ask me anything…"
            bind:value={input}
            onkeydown={handleKeys}
            class="flex-1 border-0 outline-none resize-none bg-transparent py-1 text-sm leading-relaxed text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-0 max-h-28"
        ></textarea>
        <button
            aria-label="Send message"
            onclick={sendMessage}
            disabled={loading || !input.trim()}
            class="grid size-9 shrink-0 place-items-center rounded-xl bg-neutral-900 text-white transition hover:bg-black active:scale-95 disabled:opacity-40"
        >
            <ArrowUpRightSquareIcon class="size-4.5" />
        </button>
    </div>
</div>
