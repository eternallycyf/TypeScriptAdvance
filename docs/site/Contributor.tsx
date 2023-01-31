import React, { Fragment, useEffect, useState } from "react";
import './Contributor.less'
interface IContributorData {
  name: string;
  avatar_url: string;
  github_url: string;
}

const Contributor = () => {
  const [contributors, setContributors] = useState<IContributorData[]>([]);

  useEffect(() => {
    handleInitPage()
  }, [])

  const handleInitPage = async () => {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://api.github.com/repos/eternallycyf/my-demo-markdown/contributors');
    xhr.send();
    xhr.onload = function () {
      let data = JSON.parse(xhr.responseText);
      data = data.map(item => ({
        name: item.login,
        avatar_url: item.avatar_url,
        github_url: item.html_url
      }))
      setContributors(data)
    }
  }

  return (
    <>
      <div>
        {contributors.map(item => (
          <Fragment key={item.name}>
            <span className='avatar' onClick={() => window.open(item.github_url)}>
              <img src={item.avatar_url} />
            </span>
          </Fragment>
        ))}
      </div>
    </>
  )
}

export default Contributor;