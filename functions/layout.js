
module.exports = (vesselName, cargoBackground, poolEntry, vesselLocation, personName, companyName, email, phoneNumber) =>
`<style>
    th {
    text-align: left;
  }
  th, td {
    padding-right: 15px;
    padding-bottom: 10px;
  }
  table{
    font-family: Arial;
  }
  </style>
  <h1><u>New vessel registration!</u></h1>
        <h2>Vessel details</h2>
        <table>
          <tr>
            <th>Vessel name:</th>
            <td>${vesselName}</td>
          </tr>
           <tr>
            <th>Cargo background:</th>
            <td>${cargoBackground}</td>
          </tr>
           <tr>
            <th>Pool entry</th>
            <td>${poolEntry}</td>
          </tr>
           <tr>
            <th>Vessel location:</th>
            <td>${vesselLocation}</td>
          </tr>
        </table>
        <h2>Person information</h2>
        <table>
          <tr>
            <th>Name:</th>
            <td>${personName}</td>
          </tr>
           <tr>
            <th>Company name:</th>
            <td>${companyName}</td>
          </tr>
           <tr>
            <th>Email:</th>
            <td>${email}</td>
          </tr>
           <tr>
            <th>Phone number</th>
            <td>${phoneNumber}</td>
          </tr>
        </table>`