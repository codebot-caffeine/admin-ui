import { Component } from "react";
import EachAdminCard from "../eachAdminCard";
import Pagination from "../paginationSource";

import "./index.css";

class AdminUi extends Component {
  state = {
    fetchedData: [],
    keepChecked: false,
    toBeDeleted: [],
    word: "",
    dataPerPage: [],
  };

  componentDidMount() {
    this.getAdminData();
  }

  toggleChecked = () => {
    this.setState((prevState) => ({ keepChecked: !prevState.keepChecked }));
  };

  eachProfileDeletion = (id) => {
    const { dataPerPage } = this.state;
    const updatedData = dataPerPage.filter((each) => each.id !== id);
    this.setState({ dataPerPage: updatedData });
  };

  identifyData = (event) => {
    this.setState({ word: event.target.value });
  };

  deleteSelection = () => {
    const { dataPerPage } = this.state;
    const updatedData = dataPerPage.filter((each) => each.isChecked !== true);
    console.log(updatedData);
    this.setState({ dataPerPage: updatedData });
  };

  getAdminData = async () => {
    const dataUrl =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const options = {
      method: "GET",
    };
    const response = await fetch(dataUrl, options);
    const data = await response.json();

    const formattedData = data.map((each) => ({
      name: each.name,
      email: each.email,
      id: each.id,
      role: each.role,
      isChecked: false,
    }));

    const slicedData = formattedData.slice(0, 10);
    this.setState({ fetchedData: formattedData, dataPerPage: slicedData });
  };

  pageHandler = (pageNumber) => {
    const { fetchedData } = this.state;
    const slicedData = fetchedData.slice(pageNumber * 10 - 10, pageNumber * 10);
    this.setState({ dataPerPage: slicedData });
  };

  render() {
    const { word, fetchedData, keepChecked, dataPerPage } = this.state;

    const requiredData = dataPerPage.filter(
      (eachData) =>
        eachData.role.toLowerCase().includes(word.toLowerCase()) ||
        eachData.name.toLowerCase().includes(word.toLowerCase()) ||
        eachData.email.toLowerCase().includes(word.toLowerCase())
    );

    return (
      <div className="setting-page">
        <input
          type="search"
          className="searchBar"
          placeholder="Search by name,email or role "
          onChange={this.identifyData}
          value={word}
        />
        <div className="admin-card">
          <input
            type="checkbox"
            onChange={this.toggleChecked}
            name="allChecker"
            checked={keepChecked}
            className="check-box-positioner"
          />
          <p className="title">Name</p>
          <p className="title">email</p>
          <p className="title">role</p>
          <p className="title">Actions</p>
        </div>
        <form onSubmit={this.deleteSelection}>
          {requiredData.map((eachAdminData) => (
            <EachAdminCard
              data={eachAdminData}
              key={eachAdminData.id}
              eachProfileDeletion={this.eachProfileDeletion}
              keepChecked={keepChecked}
            />
          ))}
          <div className="display-setter">
            <button type="submit">Delete Selection</button>
            <Pagination data={fetchedData} pageHandler={this.pageHandler} />
          </div>
        </form>
      </div>
    );
  }
}

export default AdminUi;
