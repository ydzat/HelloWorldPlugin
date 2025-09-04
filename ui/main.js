// HelloWorld插件UI组件
// 这个文件定义了插件的主要UI界面

const HelloWorldMain = {
  // 组件名称
  name: 'HelloWorldMain',
  
  // 组件版本
  version: '1.0.0',
  
  // 渲染函数 - 返回HTML字符串或React组件定义
  render: function(props) {
    const { extension } = props;
    
    return `
      <div style="
        padding: 24px;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          text-align: center;
          padding: 40px;
          background-color: #2d2d30;
          border-radius: 12px;
          border: 1px solid #3e3e42;
          max-width: 600px;
        ">
          <div style="font-size: 48px; margin-bottom: 24px;">
            👋
          </div>
          <h2 style="
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #ffffff;
          ">
            你好，世界！
          </h2>
          <p style="
            font-size: 18px;
            color: #cccccc;
            margin-bottom: 24px;
          ">
            欢迎使用 ${extension.displayName || extension.name} 插件！
          </p>
          <p style="
            font-size: 14px;
            color: #888888;
            margin-bottom: 24px;
          ">
            这是一个简单的示例插件，展示了插件系统的基本功能。
          </p>
          
          <div style="
            padding: 16px;
            background-color: #1e1e1e;
            border-radius: 8px;
            border: 1px solid #555;
            margin-bottom: 24px;
          ">
            <h3 style="color: #ffffff; margin-bottom: 12px;">插件信息</h3>
            <div style="font-size: 14px; color: #cccccc; text-align: left;">
              <div style="margin-bottom: 8px;">
                <strong>名称:</strong> ${extension.displayName || extension.name}
              </div>
              <div style="margin-bottom: 8px;">
                <strong>版本:</strong> ${extension.version || '1.0.0'}
              </div>
              <div style="margin-bottom: 8px;">
                <strong>发布者:</strong> ${extension.publisher || 'Unknown'}
              </div>
              <div style="margin-bottom: 8px;">
                <strong>描述:</strong> ${extension.description || ''}
              </div>
            </div>
          </div>
          
          <button 
            onclick="window.pluginAPI.executeCommand('hello-world.sayHello')"
            style="
              padding: 12px 24px;
              background-color: #007acc;
              color: #ffffff;
              border: none;
              border-radius: 6px;
              font-size: 16px;
              cursor: pointer;
              transition: background-color 0.2s;
              margin-right: 12px;
            "
            onmouseover="this.style.backgroundColor='#005a9e'"
            onmouseout="this.style.backgroundColor='#007acc'"
          >
            点击我说你好！
          </button>
          
          <button 
            onclick="window.pluginAPI.executeCommand('hello-world.showInfo')"
            style="
              padding: 12px 24px;
              background-color: #28a745;
              color: #ffffff;
              border: none;
              border-radius: 6px;
              font-size: 16px;
              cursor: pointer;
              transition: background-color 0.2s;
            "
            onmouseover="this.style.backgroundColor='#218838'"
            onmouseout="this.style.backgroundColor='#28a745'"
          >
            显示插件信息
          </button>
        </div>
      </div>
    `;
  },
  
  // 组件挂载后的初始化函数
  onMount: function(element, props) {
    console.log('HelloWorld plugin UI mounted', props);
    
    // 设置插件API
    if (!window.pluginAPI) {
      window.pluginAPI = {
        executeCommand: function(command) {
          // 调用后端API执行命令
          fetch(`http://localhost:8000/api/extensions/hello-world/commands/${command}`, {
            method: 'POST'
          }).then(response => {
            if (response.ok) {
              if (command === 'hello-world.sayHello') {
                alert('Hello World 插件说：你好！👋');
              } else if (command === 'hello-world.showInfo') {
                const info = `插件信息：\n名称: ${props.extension.displayName || props.extension.name}\n版本: ${props.extension.version}\n发布者: ${props.extension.publisher}`;
                alert(info);
              }
            }
          }).catch(error => {
            console.error('Error executing command:', error);
            alert('命令执行失败: ' + error.message);
          });
        }
      };
    }
  },
  
  // 组件卸载前的清理函数
  onUnmount: function(element, props) {
    console.log('HelloWorld plugin UI unmounted', props);
  }
};

// 导出组件
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HelloWorldMain;
} else if (typeof window !== 'undefined') {
  window.HelloWorldMain = HelloWorldMain;
}
