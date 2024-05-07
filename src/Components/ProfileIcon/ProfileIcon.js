import './ProfileIcon.css';

export const profileIcon = imgSrc => {
  return `
    <div class="profile-icon" title="Log out">
    <span class="logout-icon"><img src="/assets/logout.svg" /></span>
    <img src="${imgSrc}" /></div>
    `;
};
