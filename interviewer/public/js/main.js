document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('createInterviewForm');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission behavior
      console.log('Form submission initiated.');

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        questions: formData.get('questions'),
        idealAnswers: formData.get('idealAnswers')
      };

      console.log('Form data - Name:', data.name);
      console.log('Form data - Questions:', data.questions);
      console.log('Form data - Ideal Answers:', data.idealAnswers);

      fetch('/interviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          console.log('Form submitted successfully. Redirecting to /interviews.');
          window.location.href = '/interviews'; // Redirect to the interviews page
        } else {
          return response.text().then(text => { throw new Error(text); });
        }
      })
      .catch(error => {
        console.error('Error during form submission:', error.message);
        console.error(error.stack);
      });
    });
  }
});