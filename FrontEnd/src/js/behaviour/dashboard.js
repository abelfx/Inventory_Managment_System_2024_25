"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };

document.addEventListener("DOMContentLoaded", function () {
  var addButton = document.getElementById("addItem");
  var addForm = document.getElementById("popupOverlay");
  var cancelForm = document.getElementById("cancelAddFrom");
  addButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("this works");
    addForm.style.display = "flex";
  });
  cancelForm.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("this also works");
    addForm.style.display = "none";
  });
  var form = document.querySelector("#addForm form");
  form.addEventListener("submit", function (event) {
    return __awaiter(void 0, void 0, void 0, function () {
      var productData, response, result, error, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            event.preventDefault(); // Prevent the default form submission
            productData = {
              name: document.querySelector("#name").value.trim(),
              description: document.querySelector("#description").value.trim(),
              catagory: document.querySelector("#catagory").value.trim(),
              price: parseFloat(document.querySelector("#price").value),
              quantityInStock: parseInt(
                document.querySelector("#quantityInStock").value,
                10
              ),
              imageURL: document.querySelector("#imageURL").value.trim(),
              supplierId: parseInt(
                document.querySelector("#supplierId").value,
                10
              ),
            };
            _a.label = 1;
          case 1:
            _a.trys.push([1, 7, , 8]);
            return [
              4 /*yield*/,
              fetch("http://localhost:3000/api/addProduct", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
              }),
            ];
          case 2:
            response = _a.sent();
            if (!response.ok) return [3 /*break*/, 4];
            return [4 /*yield*/, response.json()];
          case 3:
            result = _a.sent();
            alert("Product added successfully!");
            console.log("API Response:", result);
            form.reset(); // Clear the form
            return [3 /*break*/, 6];
          case 4:
            return [4 /*yield*/, response.json()];
          case 5:
            error = _a.sent();
            alert("Failed to add product. " + error.message);
            _a.label = 6;
          case 6:
            return [3 /*break*/, 8];
          case 7:
            error_1 = _a.sent();
            console.error("Error adding product:", error_1);
            alert(
              "An error occurred while adding the product. Please try again."
            );
            return [3 /*break*/, 8];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var response,
      products_1,
      productTableBody,
      editButtons,
      cancelButton,
      deleteButtons,
      error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          return [
            4 /*yield*/,
            fetch("http://localhost:3000/api/getProducts", {
              credentials: "include",
            }),
          ];
        case 1:
          response = _a.sent();
          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }
          return [4 /*yield*/, response.json()];
        case 2:
          products_1 = _a.sent();
          productTableBody = document.querySelector("#product-table-body");
          // Ensure that we have a valid table body element
          if (productTableBody) {
            // Insert the product rows dynamically
            productTableBody.innerHTML = products_1
              .map(function (product) {
                return '\n            <tr data-product-id="'
                  .concat(product._id, '">\n              <th scope="row">')
                  .concat(product.productId, "</th>\n              <td>")
                  .concat(product.name, "</td>\n              <td>")
                  .concat(product.description, "</td>\n              <td>")
                  .concat(product.quantityInStock, "</td>\n              <td>$")
                  .concat(
                    product.price,
                    '</td>\n              <td>\n                <button class="btn btn-sm btn-warning edit-btn data-product-id="'
                  )
                  .concat(
                    product._id,
                    '">\n                  <i class="fa-solid fa-pencil-alt"></i> Edit\n                </button>\n                <button\n                  class="btn btn-sm btn-danger delete-btn"\n                >\n                  <i class="fa-solid fa-trash-alt"></i> Remove\n                </button>\n              </td>\n            </tr>\n          '
                  );
              })
              .join("");
          }
          editButtons = document.querySelectorAll(".edit-btn");
          editButtons.forEach(function (button) {
            button.addEventListener("click", function (event) {
              var buttonElement = event.target;
              var productId = buttonElement.dataset.productId;
              var productToEdit = products_1.find(function (product) {
                return product._id === productId;
              });
              if (productToEdit) {
                // Populate the popup fields with product data
                //   (document.getElementById("updateName") as HTMLInputElement).value =
                //     productToEdit.name;
                //   (
                //     document.getElementById("updateDescription") as HTMLTextAreaElement
                //   ).value = productToEdit.description;
                //   (document.getElementById("updatePrice") as HTMLInputElement).value =
                //     productToEdit.price.toString();
                //   (
                //     document.getElementById("updateQuantityInStock") as HTMLInputElement
                //   ).value = productToEdit.quantityInStock.toString();
                // Show the popup
                var popupOverlay =
                  document.getElementById("UpdatepopupOverlay");
                if (popupOverlay) {
                  popupOverlay.style.display = "block";
                }
              }
            });
          });
          cancelButton = document.getElementById("cancelUpdateForm");
          if (cancelButton) {
            cancelButton.addEventListener("click", function () {
              var popupOverlay = document.getElementById("UpdatepopupOverlay");
              if (popupOverlay) {
                popupOverlay.style.display = "none";
              }
            });
          }
          deleteButtons = document.querySelectorAll(".delete-btn");
          deleteButtons.forEach(function (button) {
            button.addEventListener("click", function (event) {
              return __awaiter(void 0, void 0, void 0, function () {
                var row, productId, deleteResponse, error_3;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      row = event.target.closest("tr");
                      console.log("hello world");
                      if (!row) {
                        console.error("Row not found for delete button click.");
                        return [2 /*return*/];
                      }
                      productId = row.dataset.productId;
                      if (!productId) {
                        console.error("Product ID not found in row dataset.");
                        return [2 /*return*/];
                      }
                      if (
                        !confirm(
                          "Are you sure you want to delete this product?"
                        )
                      )
                        return [3 /*break*/, 4];
                      _a.label = 1;
                    case 1:
                      _a.trys.push([1, 3, , 4]);
                      return [
                        4 /*yield*/,
                        fetch(
                          "http://localhost:3000/api/deleteProduct/".concat(
                            productId
                          ),
                          {
                            method: "DELETE",
                            credentials: "include",
                          }
                        ),
                      ];
                    case 2:
                      deleteResponse = _a.sent();
                      if (!deleteResponse.ok) {
                        throw new Error("Failed to delete product");
                      }
                      // Remove the row from the table on success
                      row.remove();
                      alert("Product deleted successfully!");
                      return [3 /*break*/, 4];
                    case 3:
                      error_3 = _a.sent();
                      console.error("Error deleting product:", error_3);
                      alert("Failed to delete product.");
                      return [3 /*break*/, 4];
                    case 4:
                      return [2 /*return*/];
                  }
                });
              });
            });
          });
          return [3 /*break*/, 4];
        case 3:
          error_2 = _a.sent();
          console.error("An error occurred while fetching products:", error_2);
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
});