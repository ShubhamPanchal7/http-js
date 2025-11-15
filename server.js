const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    console.log("Data:", data.toString());
    const solution = interpretData(data.toString());
    if(solution === 1){
        socket.write("1");
    }else{
        socket.write(`0 ${solution}`);
    }
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.log("Socket error:", err.message);
  });
});

server.on("error", (err) => {
  console.log("Server error:", err.message);
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

// client send prb and server return the result
// prb types - mathematical, e.g.mathematically operations on some operands
//           - program, e.g. running js code ; console.log("Hello");
/**  Mathematical format : 
        REQUEST:  math <[problem]>
        RESPONSE: <status-code> data
 **/

// const types = ["math", "program"];

const interpretData = function (data) {
    const [reqType, ...rest] = data.split(" ");
    const reqBody = rest.join(" ");
    console.log(`reqType: ${reqType} `);
    console.log(`reqBody: ${reqBody} `);

    if (reqType === "math") {
        const isMathFormatValid = data.match(/^math\s+[0-9+\-*/().\s]+$/);
        if (!isMathFormatValid) return 1;
        return eval(reqBody); 
    }

    if (reqType === "program") {
        return `Received program: ${reqBody}`;
    }

    return 1;
};

// body should be parsed correctly
// solved that body problem and return to the client
// 0: OK     1: faulty
// if OK then return the response 0 [responseBody] else 1
