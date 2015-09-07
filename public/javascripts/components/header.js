/////////////////////////////// Header ///////////////////////////////
  var Header = React.createClass({
    render: function() {
      return (
        <div className="header">
        <div className="container-fluid">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">
            <button data-target="#bs-example-navbar-collapse-1" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div id="bs-example-navbar-collapse-1" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              <li><a href="/quotes">Quotes</a>
              </li>
              <li className="active"><a href="/authors">Authors</a>
              </li>
              <li><a href="/topics">Topics</a>
              </li>
            </ul>
            <a href="/" className="navbar-brand"><img height="45px" src="../images/veto-logo.png" className="logo" alt="{{ title }}" /></a>
            <form role="search" className="navbar-form navbar-right">
              <div className="form-group">
                <div style={{marginTop: 7}} className="input-group">
                  <input type="text" placeholder="Search for..." className="form-control" />
                  <span className="input-group-btn">
                    <button type="button" className="btn btn-default">GO</button>
                  </span>
                </div>
              </div>
            </form>
            <div className="nav navbar-nav navbar-right">
              <a href="#"><img height="30px" src="../images/language.png" style={{margin: 10}} alt="{{ title }}" /></a>
            </div>
            <span className="user-profile user-profile-picture navbar-right">
            </span></div>
          {/* /.navbar-collapse */}
        </div>
        {/* /.container-fluid */}
        </div>
      );
    }
  });

  React.render(
    <Header />, document.getElementById('header')
  );
