import React, { memo } from 'react';
import './gridDash.scss';

function GridDash() {
  const arrayProject = [
    {
      title: 'UI/UX Design',
      depart: 'UI Team',
      status: 'review',
      classColor: 'status purple',
    },
    {
      title: 'Web development',
      depart: 'Frontend',
      status: 'in progress',
      classColor: 'status pink',
    },
    {
      title: 'Hshop app',
      depart: 'Mobile Team',
      status: 'pending',
      classColor: 'status orange',
    },
    {
      title: 'UI/UX Design',
      depart: 'UI Team',
      status: 'review',
      classColor: 'status purple',
    },
    {
      title: 'Web development',
      depart: 'Frontend',
      status: 'in progress',
      classColor: 'status pink',
    },
  ];

  const arrCustomer = [1, 2, 3, 4, 5, 6, 7];

  const renderProject = () => arrayProject.map((project) => (
    <tr>
      <td>{project.title}</td>
      <td>{project.depart}</td>
      <td>
        <span className={project.classColor} />
        {project.status}
      </td>
    </tr>
  ));

  const renderCustomer = () => arrCustomer.map(() => (
    <div className="customer">
      <div className="info">
        <span>H</span>
        <div>
          <h4>Nguyen Duc Hoang</h4>
          <small>CEO Excerpt</small>
        </div>
      </div>
      <div className="contact">
        <i className="fas fa-user" />
        <i className="fas fa-comment" />
        <i className="fas fa-phone" />
      </div>
    </div>
  ));

  return (
    <div className="gridDash">

      <div className="gridDash-project">

        <div className="gridDash-card">

          <div className="gridDash-card-header">

            <h2>Recent Project</h2>

            <button className="card-header-button" type="button">
              See all
              <i className="fas fa-arrow-right" />
            </button>

          </div>

          <div className="gridDash-card-body">

            <div className="gridDash-table-responsive">

              <table style={{ width: '100%' }}>

                <thead>
                  <tr>
                    <td>Project Title</td>
                    <td>Department</td>
                    <td>Status</td>
                  </tr>
                </thead>

                <tbody>

                  {renderProject()}
                  {renderProject()}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

      <div className="gridDash-customer">

        <div className="gridDash-card">

          <div className="gridDash-card-header">

            <h2>New customer</h2>

            <button className="card-header-button" type="button">

              See all

              <i className="fas fa-arrow-right" />

            </button>

          </div>

          <div className="gridDash-card-body">

            {renderCustomer()}

          </div>

        </div>

      </div>

    </div>
  );
}

export default memo(GridDash);
