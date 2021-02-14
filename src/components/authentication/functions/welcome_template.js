const Welcome = (data, name) => {

    return `
      <!DOCTYPE html>
     <html style="margin: 0; padding: 0;">
        <body style="margin: 0; padding: 0;">
            <br />
            <br />
            <div>Hello ${name}</div>
            <br />
            <br />
        </body>
     
       </html>
      `;
  };
  
  module.exports = { Welcome };