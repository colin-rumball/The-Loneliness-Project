const { exec } = require("child_process");

interface CommandConfig {
   logsEnabled?;
   onError?;
}

const ExecuteCommand = async (
   command: string,
   name: string,
   config: CommandConfig = { logsEnabled: true }
) => {
   return new Promise((resolve, reject) => {
      console.log(`Running command: ${command}`);
      const execution = exec(command);

      if (config.logsEnabled) {
         const logMessage = data => {
            const message = data.toString();
            console.log(`[${name}]: ` + message);
         };

         execution.stdout.on("data", logMessage);
      }

      execution.stderr.on("data", err => {
         console.log(err);

         if (config.onError) {
            config.onError(err);
         }
      });

      execution.on("exit", exitCode => {
         console.log(`Exiting command: ${command}`);
         if (exitCode === 0) {
            resolve(exitCode);
         } else {
            reject(exitCode);
         }
      });
   });
};

export default ExecuteCommand;
