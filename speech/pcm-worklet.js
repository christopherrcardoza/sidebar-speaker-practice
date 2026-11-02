class SidebarPCM extends AudioWorkletProcessor {
  constructor(){super();this.buffer=new Float32Array(4096);this.at=0;}
  process(inputs,outputs){
    for(const channel of outputs[0]||[])channel.fill(0);
    const channels=inputs[0];if(!channels?.length)return true;
    for(let i=0;i<channels[0].length;i++){
      let sample=0;for(const channel of channels)sample+=channel[i];
      this.buffer[this.at++]=sample/channels.length;
      if(this.at===this.buffer.length){this.port.postMessage(this.buffer,[this.buffer.buffer]);this.buffer=new Float32Array(4096);this.at=0;}
    }
    return true;
  }
}
registerProcessor('sidebar-pcm',SidebarPCM);
