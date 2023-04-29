
        document.addEventListener('DOMContentLoaded', () => {
          // get the form element
          const form = document.querySelector('form');
      
          // add an event listener for the submit event
          form.addEventListener('submit', (event) => {
            // prevent the form from submitting
            event.preventDefault();
      
            // get the form data
            const paperTitle = document.querySelector('#paper-title').value;
            const abstract = document.querySelector('#abstract').value;
            const firstName = document.querySelector('#first-name').value;
            const lastName = document.querySelector('#last-name').value;
            const email = document.querySelector('#email').value;
            const affiliation = document.querySelector('#affiliation').value;
      
            // create a JavaScript object with the form data
            const formData = {
              paperTitle: paperTitle,
              abstract: abstract,
              author: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                affiliation: affiliation
              }
            };
      
            // convert the JavaScript object to JSON
            const jsonData = JSON.stringify(formData);
      
            // create a new Blob object with the JSON data
            const blob = new Blob([jsonData], { type: 'application/json' });
      
            // create a new URL object for the Blob object
            const url = URL.createObjectURL(blob);
      
            // create a new anchor element with the URL
            const a = document.createElement('a');
            a.href = url;
            a.download = 'information.json';
      
            // click the anchor element to start the download
            document.body.appendChild(a);
            a.click();
      
            // cleanup
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          });
        });
 