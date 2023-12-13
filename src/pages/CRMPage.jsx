import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const CRMPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [amountInputs, setAmountInputs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/users");
        setUsers(data || []);

        const initialAmountInputs = data.reduce((acc, user) => {
          acc[user._id] = "";
          return acc;
        }, {});
        setAmountInputs(initialAmountInputs);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = (userId) => {
    console.log("🚀 ~ file: CRMPage.jsx:128 ~ CRMPage ~ user._id:", userId);

    axios.delete(`/users/${userId}`).then(() => {
      setUsers(users.filter((user) => user._id !== userId));
      toast.error("User Deleted");
    });
  };

  const handleAmountChange = async (userId, newAmount) => {
    try {
      const response = await axios.patch(`/users/updateAmount/${userId}`, {
        amountToAdd: newAmount,
      });
      let { data } = response;
      console.log("Updated users:", response.data);
      setUsers(data);
      toast.success("Insert Amount Succseed");
    } catch (error) {
      console.error("Error updating user amount:", error);
    }
  };

  const whenUserClicked = (userId) => {
    navigate(`${ROUTES.PROFILECRM}/${userId}`);
  };

  return (
    <div>
      <Typography variant="h2" color="primary" align="center">
        CRM Admin Panel
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Is Admin?</TableCell>
              <TableCell>Amount (USDT)</TableCell>
              <TableCell>Insert Amount to user (USDT)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>
                    {user.name.firstName} {user.name.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                  <TableCell>$ {user.amount}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      variant="outlined"
                      // id={user._id}
                      value={amountInputs[user._id]}
                      placeholder="Deposit USDT to user"
                      onChange={(e) =>
                        setAmountInputs((prevInputs) => ({
                          ...prevInputs,
                          [user._id]: e.target.value,
                        }))
                      }
                    />
                    <Button
                      variant="contained"
                      color="success"
                      style={{ marginTop: "10px" }}
                      onClick={() =>
                        handleAmountChange(user._id, amountInputs[user._id])
                      }
                    >
                      Update Amount
                    </Button>
                  </TableCell>
                  <TableCell>
                    {!user.isAdmin && (
                      <>
                        <Button
                          id={user._id}
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete Account
                        </Button>
                      </>
                    )}
                    <Button
                      id={user._id}
                      variant="contained"
                      color="success"
                      onClick={() => whenUserClicked(user._id)}
                    >
                      User Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>No users found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>{" "}
    </div>
  );
};

export default CRMPage;
