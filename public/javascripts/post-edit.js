  //find post edit form
  let postEditForm = document.getElementById('postEditForm');

  //add event submit listerner to post edit form
  postEditForm.addEventListener('submit', function (event) {
    //Find length of uploaded images
    let imageUploads = document.getElementById('imageUpload').files.length;
    //Find total number of existing images
    let existingImages = document.querySelectorAll('.imageDeleteCheckbox').length;
    //Find number of selected images for deletion
    let imgDeletions = document.querySelectorAll('.imageDeleteCheckbox:checked').length;

    //Figure out if the form can  be submitted
    let newTotal = existingImages - imgDeletions + imageUploads;
    // debugger;
    if (newTotal > 4) {
      event.preventDefault();
      let removalAmt = newTotal - 4;
      alert(`You have to remove ${removalAmt} (more) image${removalAmt === 1 ? '' : 's'}`);
    }
  });