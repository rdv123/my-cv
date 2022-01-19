'use strict';

function init() {
    getCommits();
    getCompleted();
  }
  init();
  
  async function getCommits() {
    let commits = document.querySelector(".li-commit");
    console.log("commit1111", commits.textContent);
    let repositories = document.querySelector(".li-repos");
  
    console.log("test");
    const data = await fetch(`https://api.github.com/users/rdv123/repos`);
  console.log('data', data)
    let dataParse = await data.json();
    console.log("repo", dataParse.length);
  
    const links = dataParse.map(
      (rep) => `https://api.github.com/repos/rdv123/${rep.name}/contributors`
    );
  
    const request = links.map((link) => fetch(link));
  
    const resJson = await Promise.all(request);
  
    const res = await Promise.all(resJson.map((res) => res.json()));
  
    const surilizeRes = res.flat(1);
    console.log('res1111111', res)
    console.log('sur', surilizeRes)
  
    let count = surilizeRes.reduce((acc, item) => {
      return (acc += item.contributions);
    }, 0);
    console.log("count", count);
    commits.textContent = `${count}`;
    repositories.textContent = `${dataParse.length}`;
  }
  
  async function getCompleted() {
    let completed = document.querySelector(".li-kata");
    let liHonor = document.querySelector(".li-honor");
    const dataKata = await fetch(`https://www.codewars.com/api/v1/users/rdv123/`);
    let dataKataParse = await dataKata.json();
    console.log("kata", dataKataParse.codeChallenges.totalCompleted);
    console.log("honor", dataKataParse.honor);
    let completedKata = dataKataParse.codeChallenges.totalCompleted;
    let honor = dataKataParse.honor;
    completed.textContent = `${completedKata}`;
    liHonor.textContent = `${honor}`;
  }

window.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.burger__btn');
    const menu = document.querySelector('.header-menu');

    menuBtn.addEventListener('click', togleClasses);

    function togleClasses() {
        menuBtn.classList.toggle('burger__btn_active');
        menu.classList.toggle('header-menu_active');
        menuBtn.classList.toggle('burger__btn_rotate');
    }

    window.addEventListener('click', (e) => {
        const isOverflow = e.target.classList;
        if (!isOverflow.contains('header-menu__list') && !isOverflow.contains('burger__line') &&
        !isOverflow.contains('burger__btn') && menu.classList.contains('header-menu_active')) {
            togleClasses();
        }
    });
});

// function init() {
//     getCommits();
//     getCompleted();
//   }
//   init();
  
//   async function getCommits() {
//     let commits = document.querySelector(".li-commit");
//     console.log("commit", commits.textContent);
//     let repositories = document.querySelector(".li-repos");
  
//     console.log("test");
//     const data = await fetch(`https://api.github.com/users/rdv123/repos`);
  
//     let dataParse = await data.json();
//     console.log("repo", dataParse.length);
  
//     const links = dataParse.map(
//       (rep) => `https://api.github.com/repos/rdv123/${rep.name}/contributors`
//     );
  
//     const request = links.map((link) => fetch(link));
  
//     const resJson = await Promise.all(request);
  
//     const res = await Promise.all(resJson.map((res) => res.json()));
  
//     const surilizeRes = res.flat(1);
  
//     count = surilizeRes.reduce((acc, item) => {
//       return (acc += item.contributions);
//     }, 0);
//     console.log("count", count);
//     commits.textContent = `${count}`;
//     repositories.textContent = `${dataParse.length}`;
//   }
  
//   async function getCompleted() {
//     let completed = document.querySelector(".li-kata");
//     let liHonor = document.querySelector(".li-honor");
//     const dataKata = await fetch(`https://www.codewars.com/api/v1/users/rdv123/`);
//     let dataKataParse = await dataKata.json();
//     console.log("kata", dataKataParse.codeChallenges.totalCompleted);
//     console.log("honor", dataKataParse.honor);
//     let completedKata = dataKataParse.codeChallenges.totalCompleted;
//     let honor = dataKataParse.honor;
//     completed.textContent = `${completedKata}`;
//     liHonor.textContent = `${honor}`;
//   }
  