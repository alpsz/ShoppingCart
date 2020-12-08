const fs = require('fs');
const { request } = require('https');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</botton></form><body>');
        res.write('</html>');
        return res.end();
    }
    
    if(url === "/message" && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            console.log(body);
            const parseBody = Buffer.concat(body).toString();
            //console.log(parseBody);
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt',message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
            
        });
        
        
    }
    // console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello form my node js server!</h1><body>');
    res.write('</html>');
    res.end();
}
//Method 1 to export a module
//module.exports  = requestHandler;

////Method 2 to export a module
//module.exports = {
//     handler: requestHandler,
//     someText: 'Some message',
// }


//Method 3 to export a module
module.exports.handler = requestHandler;
module.exports.someText = 'Some Message';
