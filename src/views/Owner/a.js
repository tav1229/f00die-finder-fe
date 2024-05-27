{
    "name": "string", tên nhà hàng, string
    "phone": "string", sdt nhà hàng, string
    "priceRangePerPerson": 0, giá trung bình cho 1 người, enum 0 1 2, khoảng giá kiểu từ dưới 250k, trên 500k,.., cái này pasgo có, tín tham khảo
    "capacity": 0, số lượng người chứa được, int
    "specialDishes": "string", món ăn đặc biệt, string
    "description": "string", mô tả nhà hàng, string (lưu dưới dạng html nhé)
    "note": "string", ghi chú, string
    "cuisineTypes": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    ], loại hình ẩm thực, đổ data ra rồi chọn nhiều, món nhật, món hàn,..
    "servingTypes": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6", loại hình phục vụ, đổ data ra r chọn nhiều, buffet, a la carte,..
    ],
    "customerTypes": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6", loại hình khách hàng, đổ data ra r chọn nhiều, gia đình, công ty,..
    ],
    "address": "string", địa chỉ nhà hàng, string
    "ward": "3fa85f64-5717-4562-b3fc-2c963f66afa6", phường, string
    "additionalServices": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6" dịch vụ khác, đổ data ra r chọn nhiều, wifi, parking,..
    ],
    "   ": [
      {
        "date": 0,
        "openTime": "string",
        "closeTime": "string"
      }, nhà hàng tự tạo rồi add vào, tạo thì chọn ngày, rồi chọn giờ mở, giờ đóng, ngày 1 là thứ 2, 2 là thứ 3,.., còn giờ thì như này 07:00:00.0000000	23:00:00.0000000
    ]
  }