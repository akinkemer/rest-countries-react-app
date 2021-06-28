import { Component } from "react";
import Flag from "./Flag";
import { VscSearch } from "react-icons/vsc";
import SortingIcon from "./SortingIcon";
import axiosInstance, { all } from "../api/ApiVariables";

class CountryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      nameSortingDirection: null,
      capitalSortingDirection: null,
      regionSortingDirection: null,
    };
  }
  componentDidMount = () => {
    axiosInstance
      .get(all)
      .then((countries) => this.setState({ countries: countries.data }));
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
    const tableStyles = { height: "500px", overFlow: "scroll" };
    const fixedHeadStyle = { position: "sticky", top: "0" };

    return (
      <div className="container">
        <h1 className="display-4 text-start mt-4">Countries</h1>
        <hr />
        <div className="row m-4">
          <div className="input-group mb-3 mt-3">
            <input type="text" className="form-control" placeholder="Search" />
            <span className="input-group-text px-5">
              <VscSearch size="1.5em" />
            </span>
          </div>
          <div className="table-responsive" style={tableStyles}>
            <table className="table align-middle table-striped table-hover text-center">
              <thead style={fixedHeadStyle} className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    Name
                    <button
                      className="btn p-0 my-auto"
                      onClick={() => this.sortingRequest("name")}
                    >
                      <SortingIcon
                        direction={this.state.nameSortingDirection}
                      />
                    </button>
                  </th>
                  <th scope="col">
                    Capital
                    <button
                      className="btn p-0 my-auto"
                      onClick={() => this.sortingRequest("capital")}
                    >
                      <SortingIcon
                        direction={this.state.capitalSortingDirection}
                      />
                    </button>
                  </th>
                  <th scope="col">
                    Region
                    <button
                      className="btn p-0 my-auto"
                      onClick={() => this.sortingRequest("region")}
                    >
                      <SortingIcon
                        direction={this.state.regionSortingDirection}
                      />
                    </button>
                  </th>
                  <th scope="col">Flag</th>
                </tr>
              </thead>
              <tbody>
                {countries ? (
                  countries.map((country, index) => {
                    return (
                      <tr key={country.alpha2Code}>
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
                      </tr>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default CountryTable;
