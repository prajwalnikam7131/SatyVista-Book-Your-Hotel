
document.addEventListener('DOMContentLoaded', () => {
    // Select the delete button
    const deleteButton = document.querySelector('#confirm-deletion');
    
    if (deleteButton) {
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault();

            const listingId = deleteButton.getAttribute('data-id');
            const form = deleteButton.closest('form');

            conformBox("Are you sure you want to delete this listing?", async function (confirmation) {
                if (confirmation) {
                    try {
                        // Submit the form if confirmed
                        form.submit();
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            });
        });
    }

    function conformBox(message, callback) {
        let confirmBox = document.createElement('div');
        confirmBox.classList.add('confirm-box');

        let messageBox = document.createElement('div');
        messageBox.classList.add('message-box');
        messageBox.textContent = message;
        confirmBox.appendChild(messageBox);

        let buttonBox = document.createElement('div');
        buttonBox.classList.add('button-box');
        messageBox.appendChild(buttonBox);

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = "Delete";
        buttonBox.appendChild(deleteBtn);

        let cancelBtn = document.createElement('button');
        cancelBtn.classList.add('cancel-btn');
        cancelBtn.textContent = "Cancel";
        buttonBox.appendChild(cancelBtn);

        document.body.appendChild(confirmBox);

        function removeConformBox() {
            document.body.removeChild(confirmBox);
        }

        deleteBtn.addEventListener('click', () => {
            callback(true);
            removeConformBox();
        });

        cancelBtn.addEventListener('click', () => {
            callback(false);
            removeConformBox();
        });
    }
});
