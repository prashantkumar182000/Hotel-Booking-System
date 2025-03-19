# **Hotel Booking System**

A full-stack hotel booking system with JWT authentication, dynamic pricing, and an admin panel for managing bookings.

---

## **Features**
1. **User Authentication:**
   - Register a new user.
   - Log in with email and password (JWT token issued).

2. **Booking System:**
   - Book a hotel room with dynamic pricing.
   - View user bookings.

3. **Admin Panel:**
   - Add new rooms.
   - View all rooms and bookings.
   - Cancel bookings and update payment status.

4. **Dynamic Pricing:**
   - Room prices fluctuate based on demand using a **Segment Tree**.

---

## **Project Tree**
```
hotel-booking-system/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── index.js
│
├── models/
│   ├── User.js
│   ├── Room.js             # Room model with dynamic pricing logic
│   ├── Booking.js          # Booking model
│
├── routes/
│   ├── auth.js             # Authentication routes (register, login)
│   ├── booking.js          # Booking routes (book, view bookings)
│   ├── admin.js            # Admin routes (add rooms, manage bookings)
│
├── utils/
│   ├── segmentTree.js      # Segment Tree implementation for dynamic pricing
│
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│
└── tests/ (optional)       # For future test cases
```

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js (v18 or higher)
- MongoDB (running locally or on a cloud service)
- Git (for version control)

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/hotel-booking-system.git
cd hotel-booking-system
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Set Up Environment Variables**
Create a `.env` file in the root directory and add the following:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/hotel_booking
JWT_SECRET=your_jwt_secret
```

### **5. Start the Server**
```bash
npm run dev
```

The server will start on `http://localhost:5000`.

---

## **Testing Instructions**

### **1. User Registration**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

### **2. User Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### **3. Book a Room**
```bash
curl -X POST http://localhost:5000/api/booking/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"roomId": "<roomId>", "checkInDate": "2023-10-01", "checkOutDate": "2023-10-05"}'
```

### **4. View User Bookings**
```bash
curl -X GET http://localhost:5000/api/booking/bookings \
  -H "Authorization: Bearer <token>"
```

### **5. Admin: Add a Room**
```bash
curl -X POST http://localhost:5000/api/admin/rooms \
  -H "Content-Type: application/json" \
  -d '{"type": "Deluxe", "basePrice": 100, "amenities": ["WiFi", "TV"]}'
```

### **6. Admin: View All Rooms**
```bash
curl -X GET http://localhost:5000/api/admin/rooms
```

### **7. Admin: View All Bookings**
```bash
curl -X GET http://localhost:5000/api/admin/bookings
```

### **8. Admin: Cancel a Booking**
```bash
curl -X DELETE http://localhost:5000/api/admin/bookings/<bookingId>
```

### **9. Admin: Update Payment Status**
```bash
curl -X PATCH http://localhost:5000/api/admin/bookings/<bookingId> \
  -H "Content-Type: application/json" \
  -d '{"paymentStatus": "Paid"}'
```

---

## **Dynamic Pricing**
Room prices are calculated dynamically based on demand using a **Segment Tree**. The price formula is:
```
price = basePrice * (1 + demand / 100)
```
- **Demand** is tracked using a Segment Tree.
- **basePrice** is the initial price of the room.

---

## **Technologies Used**
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Dynamic Pricing:** Segment Tree
- **Testing:** Postman, cURL

---

## **Future Enhancements**
1. **Frontend:** Build a React.js or Next.js frontend for a better user experience.
2. **Payment Integration:** Integrate Stripe for payment processing.
3. **Email Notifications:** Send confirmation emails after booking.
4. **Unit Tests:** Add unit and integration tests using Jest or Mocha.
