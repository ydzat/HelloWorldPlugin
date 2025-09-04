/**
 * Hello World Extension
 * 
 * A simple test extension to verify the plugin system is working correctly.
 */

// Extension activation function
function activate(context) {
    console.log('Hello World extension is now active!');
    
    // Register the sayHello command
    const sayHelloCommand = vscode.commands.registerCommand('hello-world.sayHello', () => {
        vscode.window.showInformationMessage('Hello World from the extension!');
        console.log('Hello World command executed');
    });
    
    // Register the showInfo command
    const showInfoCommand = vscode.commands.registerCommand('hello-world.showInfo', () => {
        const info = {
            name: 'Hello World Extension',
            version: '1.0.0',
            description: 'A simple test extension',
            status: 'Active',
            commands: ['hello-world.sayHello', 'hello-world.showInfo']
        };
        
        vscode.window.showInformationMessage(
            `Extension Info: ${JSON.stringify(info, null, 2)}`
        );
        console.log('Extension info displayed:', info);
    });
    
    // Add commands to subscriptions for proper cleanup
    context.subscriptions.push(sayHelloCommand);
    context.subscriptions.push(showInfoCommand);
    
    // Log successful activation
    console.log('Hello World extension commands registered successfully');
    
    // Return public API (optional)
    return {
        sayHello: () => {
            console.log('Hello from extension API!');
            return 'Hello World!';
        },
        getInfo: () => {
            return {
                name: 'Hello World Extension',
                version: '1.0.0',
                active: true
            };
        }
    };
}

// Extension deactivation function
function deactivate() {
    console.log('Hello World extension is being deactivated');
}

// Export the activation and deactivation functions
module.exports = {
    activate,
    deactivate
};
