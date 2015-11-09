angular
    .module('app.admin', [])
    .controller('AdminController', AdminController);

function AdminController(Product, Order, $scope) {
    var admin = this;
    admin.productData = {};
    admin.createProduct = createProduct;
    admin.uploadFiles = uploadFiles;

    $scope.$watch('pictures', function () {
      console.log('these are the pictures: ', $scope.pictures)
      uploadFiles($scope.pictures);
    });

    Product.getCategories()
    .then(function(data) {
      admin.categories = data.instance;
    });

    function uploadFiles(files) {
      console.log('its adding the files: ', files)
      Product.createPicture(files)
      .then(function(data) {
        console.log('it added the photo, ', data);
        admin.productData.pictures = data.pictures;
      });
    }

    function createProduct() {
      Product.create(admin.productData)
      .then(function(data) {
        admin.producData = {};
        admin.successMessage = 'Product created!';
        admin.newProductId = data.get('_id');
        admin.newProductName = data.get('name');
      });
    }


    Order.history()
    .then(function(data) {
      console.log('order history data', data);
      admin.orders = data.instance;
    });

}
