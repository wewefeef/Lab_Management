export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
  },
  {
    field: "distance",
    headerName: "Distance (km)",
    width: 120,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 150,
  },
  {
    field: "relationship",
    headerName: "Relationship",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const notificationColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  { field: "timestamp", headerName: "Timestamp", width: 200 },
  { field: "userId", headerName: "User ID", width: 100 },
  { field: "endpoint", headerName: "Endpoint", width: 200 },
  { field: "method", headerName: "Method", width: 100 },
  { field: "action", headerName: "Action", width: 150 },
];