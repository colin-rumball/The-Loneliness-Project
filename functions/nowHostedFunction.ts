export default (req, res) => {
   console.log("Received Call To Hosted Function");
   res.send("Hello from a Now hosted function");
};
