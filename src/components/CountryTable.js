import { Component } from "react";
import Flag from "./Flag";
import { VscSearch } from "react-icons/vsc";
import SortingIcon from "./SortingIcon";
import axiosInstance, { all } from "../api/ApiVariables";
import "../style.css";


class CountryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persistentCountries: [],
      countries: [],
      capitalSearchKeyword: "",
      tableSearchKeyword: "",
      nameSortingDirection: null,
      capitalSortingDirection: null,
      regionSortingDirection: null,
    };
  }

  componentDidMount = async () => {
    const response = await axiosInstance.get(all);
    this.setState({ persistentCountries: response.data });
    this.setState({ countries: response.data });
  };

  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  handleSearchInCapitals = (e) => {
    const value = this.capitalize(e.target.value);

    if (value) {
      const countries=JSON.parse(JSON.stringify(this.state.persistentCountries))
      const data = countries.filter((country) => {
        if (country.capital.search(value) === 0) { return true }
        else return false;
      })
  
      this.setState({countries:data})
      this.setState({capitalSearchKeyword: value });
    } else {
      this.setState({ countries: this.state.persistentCountries });
      this.setState({capitalSearchKeyword: value });
    }
  };
  handleSearchInTables = (e) => {
    this.setState({ tableSearchKeyword: this.capitalize(e.target.value) });
  };
  assignNullExcept = (field) => {
    if (field === "name") {
      this.setState({
        capitalSortingDirection: null,
        regionSortingDirection: null,
      });
    } else if (field === "capital") {
      this.setState({
        nameSortingDirection: null,
        regionSortingDirection: null,
      });
    } else {
      this.setState({
        capitalSortingDirection: null,
        nameSortingDirection: null,
      });
    }
  };

  sortingRequest = (field) => {
    if (field != null) {
      this.assignNullExcept(field);

      const fieldNameInState = `${field}SortingDirection`;

      const dir = this.state[fieldNameInState];

      if (dir == null) this.setState({ [fieldNameInState]: "ascending" });
      else if (dir === "ascending")
        this.setState({ [fieldNameInState]: "descending" });
      else this.setState({ [fieldNameInState]: null });

      let countries = [...this.state.countries];

      const direction = this.state[fieldNameInState];

      countries.sort((a, b) => {
        if (a[field] > b[field]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[field] < b[field]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      this.setState({ countries: countries });
    }
  };
  render() {
    const countries = this.state.countries;
    const tableStyles = { height: "500px", overFlow: "hidden" };
    const fixedHeadStyle = { position: "sticky", top: "0" };

    return (
      <div className="container">
        <h1 className="display-4 text-start mt-4">Countries</h1>
        <hr />
        <div className="row m-4">
          <div className="input-group mb-3 mt-3 d-flex-inline">
            <input
              type="text"
              className="form-control form-control-md rounded border-2"
              placeholder="Search"
              value={this.state.tableSearchKeyword}
              onChange={this.handleSearchInTables}
            />
            <span className="input-group-text px-5">
              <VscSearch size="1.5em" />
            </span>
          </div>
          <div className="table-responsive scrollbar" style={tableStyles}>
            <table className="table align-middle table-striped table-hover table-bordered fixed">
              <thead style={fixedHeadStyle} className="table-light text-center">
                <tr>
                  <th scope="col" style={{width:"5%"}}>#</th>
                  <th scope="col" style={{width:"30%"}}>
                    Name
                    <button
                      className="btn btn-light rounded-circle px-0"
                      onClick={() => this.sortingRequest("name")}
                    >
                      <SortingIcon
                        direction={this.state.nameSortingDirection}
                      />
                    </button>
                  </th>
                  <th scope="col" style={{width:"35%"}}>
                    <div className="d-inline-flex rounded-circle px-0">
                      <div className="my-auto">Capital</div>
                      <button
                        className="btn btn-light rounded-circle px-0"
                        onClick={() => this.sortingRequest("capital")}
                      >
                        <SortingIcon
                          direction={this.state.capitalSortingDirection}
                        />
                      </button>
                      <div className="input-group pt-1 d-none d-md-block">
                        <input
                          type="text"
                          className="form-control-sm"
                          placeholder="Search in capitals"
                          onChange={this.handleSearchInCapitals}
                          value={this.state.capitalSearchKeyword}
                        />
                      </div>
                    </div>
                  </th>
                  <th scope="col" style={{width:"15%"}}>
                    Region
                    <button
                      className="btn btn-light rounded-circle px-0"
                      onClick={() => this.sortingRequest("region")}
                    >
                      <SortingIcon
                        direction={this.state.regionSortingDirection}
                      />
                    </button>
                  </th>
                  <th scope="col" className="pb-3">
                    Flag
                  </th>
                </tr>
              </thead>
              <tbody className="text-head">
                {countries &&
                  countries.map((country, index) => {
                    return (<tr key={country.alpha2Code}>
                      <th scope="row">{index + 1}</th>
                      <td>{country.name}</td>
                      <td>{country.capital || "-"}</td>
                      <td>{country.region || "-"}</td>
                      <td>
                        <Flag
                          svgURL={country.flag}
                          countryName={country.name}
                        ></Flag>
                      </td>
                    </tr>);
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default CountryTable;
