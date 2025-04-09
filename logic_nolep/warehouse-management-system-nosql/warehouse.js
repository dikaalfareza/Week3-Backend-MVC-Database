//  1. buat database warehouse dan buat colection untuk warehouse system
// db.createCollection("products")
// db.createCollection("inventory")
// db.createCollection("orders")

//  2. Masukkan data berikut ke dalam Colections Products
// db.products.insertMany([
//   {
//     _id: 1,
//     product_name: "Laptop",
//     category: "Elektronik",
//     price: 999.99
//   },
//   {
//     _id: 2,
//     product_name: "Meja Kursi",
//     category: "Perabot",
//     price: 199.99
//   },
//   {
//     _id: 3,
//     product_name: "Printer",
//     category: "Elektronik",
//     price: 299.99
//   },
//   {
//     _id: 4,
//     product_name: "Rak Buku",
//     category: "Perabot",
//     price: 149.99
//   }
// ])

//  3. Tulis query untuk menampilkan semua produk beserta nama dan harganya, diurutkan berdasarkan harga dalam urutan menaik (Asceding).
// db.products.find({}, {
//   _id: 0,
//   category: 0
// }).sort({
//   price:1
// })

//  4. Masukkan data berikut ke dalam Colection Inventory
// db.inventory.insertMany([
//   {
//     _id: 1,
//     product_id: 1,
//     quantity: 50,
//     location: "Gudang A"
//   },
//   {
//     _id: 2,
//     product_id: 2,
//     quantity: 30,
//     location: "Gudang B"
//   },
//   {
//     _id: 3,
//     product_id: 3,
//     quantity: 20,
//     location: "Gudang A"
//   },
//   {
//     _id: 4,
//     product_id: 4,
//     quantity: 40,
//     location: "Gudang B"
//   }
// ])

//  5. Tulis Query untuk menggabungkan tabel (aggregate) Produk dan Inventaris, yang menampilkan nama produk, kuantitas, dan lokasi untuk semua produk.
// db.inventory.aggregate([
//   {
//     $lookup: {
//       from: "products",
//       localField: "product_id",
//       foreignField: "_id",
//       as: "product_info"
//     }
//   },
//   {
//     $unwind: "$product_info"
//   },
//   {
//     $project: {
//       _id: 0,
//       product_name: "$product_info.product_name",
//       quantity: 1,
//       location: 1
//     }
//   }
// ])

//  6. Perbarui harga 'Laptop' menjadi 1099,99.
// db.products.updateOne({product_name: "Laptop"},
//  {
//   $set: {
//     price: 1099.99
//   }
//  }
// )

//  7. Tuliskan query untuk menghitung nilai total inventaris pada setiap gudang.
// db.inventory.aggregate([
//   {
//     $lookup: {
//       from: "products",
//       localField: "product_id",
//       foreignField: "_id",
//       as: "product_info"
//     }
//   },
//   {
//     $unwind: "$product_info"
//   },
//   {
//     $group: {
//       _id: "$location",
//       total_value: {$sum: { $multiply: ["$quantity", "$product_info.price"]}}
//     }
//   },
//   {
//     $project: {
//       _id: 1,
//       total_value: {$round: ["$total_value", 2]}
//     }
//   },
//   { $sort: {total_value: -1} }
// ])

//  8. Masukkan data berikut ke dalam Colection Orders
// db.orders.insertMany([
//   {
//     _id: 1,
//     customer_id: 101,
//     order_date: ISODate("2024-08-12"),
//     order_details: [
//       { product_id: 1, quantity: 2 },
//       { product_id: 3, quantity: 1 }
//     ]
//   },
//   {
//     _id: 2,
//     customer_id: 102,
//     order_date: ISODate("2024-08-13"),
//     order_details: [
//       { product_id: 2, quantity: 1 },
//       { product_id: 4, quantity: 2 }
//     ]
//   }
// ])

//  9. Tulis Query untuk menampilkan jumlah total untuk setiap pesanan, termasuk order_id, order_date, dan total_amount.
// db.orders.aggregate([
//   { $unwind: "$order_details" },
//   {
//     $lookup: {
//       from: "products",
//       localField: "order_details.product_id",
//       foreignField: "_id",
//       as: "product_info"
//     }
//   },
//   { $unwind: "$product_info" },
//   {
//     $group: {
//       _id: {order_id: "$_id", order_date: "$order_date"},
//       total_amount: {$sum: {$multiply: ["$order_details.quantity", "$product_info.price"]}}
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       order_id: "$_id.order_id",
//       order_date: "$_id.order_date",
//       total_amount: {$round: ["$total_amount", 2]}
//     }
//   },
//   { $sort: {order_id: 1}}
// ])

//  10. Tulis query untuk mencari produk yang belum pernah dipesan.
// db.products.aggregate([
//  {
//   $lookup: {
//     from: "orders",
//     let: {product_id: "$_id"},
//     pipeline: [
//       {
//         $match: {
//           $expr: {
//             $gt: [
//               {
//                 $size: {
//                   $filter: {
//                     input: "$order_details",
//                     as: "od",
//                     cond: { $eq: ["$$product_id", "$$od.product_id"] }
//                   }
//                 }
//               },
//               0
//             ]
//           }
//         }
//       }
//     ],
//     as: "related_orders"
//   }
//  },
//  { $match: {related_orders: {$eq: []}} },
//  {
//   $project: {
//     _id: 0,
//     product_id: "$_id",
//     product_name: 1
//   }
//  }
// ])
