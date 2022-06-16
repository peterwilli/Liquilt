var input = document.getElementById('upload');

input.addEventListener('change', function(event) {
  var file = this.files[0];
  var url = URL.createObjectURL(file);

  let liquilt = document.createElement('liquilt-viewer');
  liquilt.render = url;
  document.body.appendChild(liquilt);
  document.getElementById("upload-view").remove();
});
