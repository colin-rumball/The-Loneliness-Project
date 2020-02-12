const { exec } = require("child_process");

// const oldLog = console.log;
// console.log = message => {
//    oldLog("ERR!", message);
// };

// const oldLog = console.debug;
// console.debug = message => {
//    oldLog("\u001b[" + 32 + "m" + "hello stack" + "\u001b[0m");
// };

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
      console.log(`\n>>> Running command: ${command} with name ${name}`);
      const execution = exec(command, (err, stdout, stderr) => {
         if (err && config.onError) {
            config.onError(err);
         }
         console.log("TCL: execution -> stdout", stdout);
      });

      if (config.logsEnabled) {
         const logMessage = data => {
            console.log("TCL: data", data);
            const message = data.toString().trim();
            if (message && message != "") {
               console.log(`> [${name}]: ` + message);
            }
         };

         execution.stdout.on("message", logMessage);
      }

      execution.stderr.on("data", err => {
         console.log(err);

         if (config.onError) {
            config.onError(err);
         }
      });

      execution.on("exit", exitCode => {
         console.log(`>>> ${name} has finished.\n`);
         if (exitCode === 0) {
            resolve(exitCode);
         } else {
            reject(exitCode);
         }
      });
   });
};

export default ExecuteCommand;
