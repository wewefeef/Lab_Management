import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const users = [
	{
		name: "Admin",
		email: "dfgdgdgdfgdfgfd",
		phone: "0583530530",
		role: "Admin",
		status: "Hoạt động",
	},
	{
		name: "Trần Thị B",
		email: "thib@gmail.com",
		phone: "0583530530",
		role: "Nhân viên",
		status: "Tạm khóa",
	},
	{
		name: "Trần Thị B",
		email: "thic@gmail.com",
		phone: "0583530530",
		role: "Nhân viên",
		status: "Hoạt động",
	},
	{
		name: "Trần Thị B",
		email: "thib@gmail.com",
		phone: "0583530530",
		role: "Nhân viên",
		status: "Hoạt động",
	},
	{
		name: "Trần Thị B",
		email: "thib@gmail.com",
		phone: "0583530530",
		role: "Nhân viên",
		status: "Hoạt động",
	},
	{
		name: "Trần Thị B",
		email: "thib@gmail.com",
		phone: "0583530530",
		role: "Nhân viên",
		status: "Hoạt động",
	},
	{
		name: "Trần Thị B",
		email: "thib@gmail.com",
		phone: "0583530530",
		role: "Nhân viên",
		status: "Hoạt động",
	},
	{
		name: "Trần Thị B",
		email: "thib@gmail.com",
		phone: "0583530530",
		role: "Nhân viên",
		status: "Hoạt động",
	},
	{
		name: "Trần Thị B",
		email: "thib@gmail.com",
		phone: "0583530530",
		role: "Nhân viên",
		status: "Hoạt động",
	},
];

const statusColor = (status) =>
	status === "Hoạt động"
		? "bg-emerald-400"
		: status === "Tạm khóa"
		? "bg-yellow-400"
		: "bg-gray-300";

export default function Users() {
	const [page] = useState(1);
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar />
			<div className="flex-1 flex flex-col min-w-0">
				<Navbar />
				<div className="flex-1 flex flex-col">
					<div className="w-full max-w-7xl mx-auto px-4 py-8">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
							<h1 className="text-3xl font-bold mb-4 sm:mb-0">
								Quản lí người dùng
							</h1>
							<button
								className="bg-emerald-400 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-medium transition"
								onClick={() => navigate("/users/add")}
							>
								Thêm người dùng
							</button>
						</div>
						<div className="bg-white rounded-xl shadow border overflow-x-auto">
							<table className="min-w-full text-sm">
								<thead>
									<tr className="text-gray-600 text-base border-b">
										<th className="py-4 px-4 text-left font-medium">
											Họ và tên
										</th>
										<th className="py-4 px-4 text-left font-medium">
											Email
										</th>
										<th className="py-4 px-4 text-left font-medium">
											Số điện thoại
										</th>
										<th className="py-4 px-4 text-left font-medium">
											Vai trò
										</th>
										<th className="py-4 px-4 text-left font-medium">
											Trạng thái
										</th>
										<th className="py-4 px-4 text-left font-medium">
											Hành động
										</th>
									</tr>
								</thead>
								<tbody>
									{users.map((u, idx) => (
										<tr
											key={idx}
											className="border-b last:border-b-0 hover:bg-gray-50 transition"
										>
											<td className="py-3 px-4">{u.name}</td>
											<td className="py-3 px-4">{u.email}</td>
											<td className="py-3 px-4">{u.phone}</td>
											<td className="py-3 px-4">{u.role}</td>
											<td className="py-3 px-4">
												<span
													className={`px-4 py-1 rounded-full text-white text-xs font-semibold ${statusColor(
														u.status
													)}`}
												>
													{u.status}
												</span>
											</td>
											<td className="py-3 px-4">
												<div className="flex gap-2">
													<button
														className="p-2 rounded hover:bg-gray-100 text-emerald-500"
														onClick={() =>
															navigate(`/users/edit/${idx}`)
														}
													>
														<EditIcon fontSize="small" />
													</button>
													<button
														className="p-2 rounded hover:bg-gray-100 text-red-400"
														onClick={() => alert("Xóa user")}
													>
														<DeleteIcon fontSize="small" />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* Pagination */}
						<div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
							<span>Trang {page}/1</span>
							<div className="flex gap-2">
								<button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100">
									&lt;
								</button>
								<button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100">
									&gt;
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

