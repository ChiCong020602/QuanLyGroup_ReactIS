import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import {
  ExclamationCircleFilled,
  ReloadOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import "./Table.css";
import EditTable from "./EditTable";
import { NavLink } from "react-router-dom";
import "./Table.css";

const { confirm } = Modal;

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     number: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     number: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     number: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

const TableCp = () => {
  const [data, setDataTable] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null);
  const api = `http://localhost:8090/api/v1/groups`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState({});

  // const [isSortAsc, setSortAsc] = useState("true");

  const [nameSort, setNameSort] = useState("groupName");

  // const handelisSortAsc = () => {
  //   setSortAsc(true);
  // };

  // const handelIsSortDesc = () => {
  //   setSortAsc(false);
  // };

  const apiCall = () => {
    axios
      .get(api + "?size=999")
      .then((res) => {
        setDataTable(res?.data.content);
      })
      .catch((err) => `đã có lỗi call table` + err);
  };
  useEffect(() => {
    apiCall();
  }, []);

  const handleSortAsc = () => {
    axios
      .get(api + `?size=999&sort=${nameSort},asc`)
      .then((res) => {
        setDataTable(res?.data.content);
      })
      .catch((err) => `đã có lỗi call table` + err);
  };

  const handleSortDesc = () => {
    axios
      .get(api + `?size=999&sort=${nameSort},desc`)
      .then((res) => {
        setDataTable(res?.data.content);
      })
      .catch((err) => `đã có lỗi call table` + err);
  };

  const handelRefresh = () => {
    apiCall();
  };

  const columns = [
    {
      title: "Stt",
      dataIndex: "id",
      key: "id",
      width: 50,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Member",
      dataIndex: "member",
      key: "member",
      width: 100,
    },
    {
      title: `Creator`,
      dataIndex: "creatorUserName",
      key: "creatorUserName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, itemTable) => (
        <Space size="middle">
          <Tag
            color={"red"}
            style={{ cursor: "pointer" }}
            onClick={() => showDeleteConfirm(itemTable)}
          >
            Delete
          </Tag>
          <Tag
            color={"green"}
            style={{ cursor: "pointer" }}
            onClick={() => showEdit(itemTable)}
          >
            Edit
          </Tag>
        </Space>
      ),
    },
  ];

  const showEdit = (item) => {
    setItemDetail(item);
    setIsModalOpen(true);
    // console.log(item);
  };

  const showDeleteConfirm = (item) => {
    confirm({
      title: `Are you sure delete this ${item?.groupName}?`,
      icon: <ExclamationCircleFilled />,
      content: `creatorUserName: ${item?.creatorUserName} - member: ${item?.member}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteItemTb(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteItemTb = (itemTable) => {
    // console.log(itemTable, "itemTable");
    if (itemTable?.id) {
      axios
        .delete(api + `/${itemTable?.id}`)
        .then((res) => {
          apiCall();
        })
        .catch((err) => console.log("Xóa bản ghi không thành công " + err));
    }
  };

  //Lifting state
  const editItemTb = (item) => {
    // console.log("item", item);
    //destructuring
    const { id, groupName, member, creatorUserName, date, key } = item;
    //call api
    axios
      .put(api + `/${id}`, {
        groupName,
        member,
        creatorUserName,
        date,
        key,
      })
      .then((res) => {
        setIsModalOpen(false);
      })
      .then((res) => apiCall());
  };

  return (
    <>
      <div id="view_table">
        <h3>Danh sách sản phẩm</h3>
        <div className="option_table">
          <div className="add_table">
            <NavLink to="/addItemTable" replace={true}>
              <Tag color={"blue"}>Thêm mới</Tag>
            </NavLink>
          </div>
          <div>
            <button className="btn_refresh" onClick={handelRefresh}>
              Refresh <ReloadOutlined />
            </button>
          </div>
          <div className="sort_table">
            <button className="btn_sort" onClick={handleSortDesc}>
              Sort <SortAscendingOutlined />
            </button>
            <button className="btn_sort" onClick={handleSortAsc}>
              Sort <SortDescendingOutlined />
            </button>
            <select
              name="cars"
              id="cars"
              onChange={(e) => setNameSort(e.target.value)}
            >
              <option value="groupName">Group name</option>
              <option value="member">Member</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>
      </div>
      {data.length > 0 && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          scroll={{ x: 700, y: 500 }}
        />
      )}
      {/* SHOW MODAL */}
      <EditTable
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        itemDetail={itemDetail}
        setItemDetail={setItemDetail}
        callBackUpdate={editItemTb}
        data={data}
      />
    </>
  );
};
export default TableCp;
