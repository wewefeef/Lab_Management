import { useEffect, useState } from "react";

// Mock data for different endpoints
const mockData = {
  hotels: [
    { _id: "1", name: "Hotel A", type: "Resort", city: "Hanoi", address: "123 Le Loi", contact: "0912345678", relationship: "Sub-hotel", status: "Active" },
    { _id: "2", name: "Hotel B", type: "Hotel", city: "Ho Chi Minh", address: "456 Nguyen Hue", contact: "0987654321", relationship: "Affiliated", status: "Inactive" },
  ],
  users: [
    { _id: "1", username: "user1", email: "user1@example.com", country: "Vietnam", city: "Hanoi", phone: "0912345678" },
    { _id: "2", username: "user2", email: "user2@example.com", country: "Vietnam", city: "Ho Chi Minh", phone: "0987654321" },
  ],
  // Add more mock data for other paths if needed
};

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Extract path from URL (e.g., "/hotels" -> "hotels")
        const path = url.split("/").filter(Boolean)[0] || "hotels";
        
        // Get mock data based on path
        const mockResponse = mockData[path] || [];
        setData(mockResponse);
      } catch (err) {
        setError(new Error("Failed to fetch mock data"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Extract path from URL
      const path = url.split("/").filter(Boolean)[0] || "hotels";
      
      // Get mock data based on path
      const mockResponse = mockData[path] || [];
      setData(mockResponse);
    } catch (err) {
      setError(new Error("Failed to re-fetch mock data"));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reFetch };
};

export default useFetch;