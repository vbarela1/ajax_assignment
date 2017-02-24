$(document).ready( () => {
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

  fetchUsers = () => {
    let $users = $('#users');
    $users.empty();
    $.ajax({
      url: `${baseUrl}/users`,
      type: 'GET',
      dataType: 'JSON'
    }).done( data => {
      data.forEach( user => {
        $('#users').append(`
                    <li>
                      ${user.first_name}
                      <button data-id=${user.id} class ='details-btn'>Toggle Details</button>
                      <button data-id=${user.id} class ='delete-btn'>Delete User</button>
                      <button data-id=${user.id} class ='edit-btn'>Edit User</button>
                    </li>`
                   );
      });
    }).fail( error => {
       console.log(error)
    });
  }

  fetchUsers();

  // $(document).on('click', 'edit.btn', (event) => {
  //   let usersId = $(event.target).data('id');
  //   let $userForm = $('#user-form');
  //     $userForm.submit( (event) => {

  //     $.ajax({
  //       url: `${baseUrl}/users/${userId}`,
  //       type: 'GET',
  //       datatType: 'JSON',
  //       data: $userForm.serializeArray()
  //     }).done( data => {
  //       // users form needs to have users info populated
  //       $userForm;
  //       $('user-first-name').focus();
  //       fetchUsers();
  //     }).fail( data => {
  //       console.log(data)
  //     });
  //   });
  // });



  $(document).on('click', '.delete-btn', (event) => {
    let userId = $(event.target).data('id');
    $.ajax({
      url: `${baseUrl}/users/${userId}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( data => {
      fetchUsers();
    }).fail( data => {
      console.log(data);
    });
  });

  $(document).on('click', '.details-btn', (event) => {
    //make ajax call 
    let userId = $(event.target).data('id');
    $.ajax({
      url: `${baseUrl}/users/${userId}`,
      type: 'GET',
      dataType: 'JSON' 
    }).done( user => {
      //populate a div with the users info
      let $userInfo=$('#user-info');
      $userInfo.html(`
                      <p>${user.first_name}</p>
                      <p>${user.last_name}</p>
                      <p>${user.phone_number}</p>
                    `);
      //slideToggle the div
      $userInfo.show();
    }).fail( error => {
      //BEST PRACTICE: handle the error and alert the user 
      console.log(error);
    });
  });

  //grab the form off the page
  let $userForm = $('#user-form')
  //listen for the submit event
  $userForm.submit( (event) => {
    //prevent the default  
    debugger;   
    event.preventDefault();
    $.ajax({
      url: `${baseUrl}/users`,
      type: 'POST',
      dataType: 'JSON',
      data: $userForm.serializeArray()
    }).done( data => {
      $userForm[0].reset();
      $('#user-first-name').focus();
      fetchUsers();
    }).fail( error => {
      console.log(error)
    });
  });
});

