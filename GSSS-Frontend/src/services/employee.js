import { createAddress, modifyAddress } from "./address.js";
import ax from "./common.js";

export const getAllEmployees = () => new Promise((resolve, reject) => {
    ax.get("/employees")
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

export const getEmployee = (email) => new Promise((resolve, reject) => {
    ax.get(`/employee/${email}`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

export const createEmployee = (employee) => new Promise((resolve, reject) => {
    createAddress(employee.address)
    .then(res => {
        employee.address.id = res.data.id;
        ax.post("/employee", employee)
        .then(res2 => resolve(res2.data))
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

export const modifyEmployee = (modifiedEmpoyee) => new Promise((resolve, reject) => {
    modifyAddress(modifiedEmpoyee.address)
    .then(res => {
        ax.put("/employee", modifiedEmpoyee)
        .then(res2 => resolve(res2.data))
        .catch(err => reject(err));
    })
    .catch(err => reject(err));
});

export const modifyPassword = (email, modifiedPassword) => new Promise((resolve, reject) => {
    reject("To be implemented");
});