<script lang='ts'>
    import { ChartAreaIcon } from "lucide-svelte";
    import MenoChat from "./chatUi/MenoChat.svelte";
    import BotAvatar from "./chatUi/BotAvatar.svelte";
    let showChatMenu=$state(false)
</script>


<MenoChat bind:showChatMenu={showChatMenu}/>
<button onclick={()=>showChatMenu=!showChatMenu} class=" group  text-white rounded-full size-14 hover:shadow-2xl transition grid place-items-center fixed right-4 bottom-4">
 <BotAvatar class="transition-transformn duration-300 group-hover:scale-125 group-hover:rotate-12 animate-bounce "/>
</button>