
const Loader = () => {
  return (
    <div class="flex justify-center items-center bg-[rgba(0,0,0,0.9)] rounded-lg w-[120px] h-[90px]">
        <div class="flex flex-row gap-2">
          <div class="w-4 h-4 rounded-full bg-green-500 animate-bounce"></div>
          <div class="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
        </div>
    </div>
  )
}

export default Loader