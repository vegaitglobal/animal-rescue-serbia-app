function UserItem() {
  return (
    <tr>
      <td>1.</td>
      <td>
        <img src="./user.jpg" alt="" />
      </td>
      <td>petar.p</td>
      <td>Petar</td>
      <td>Petrovic</td>
      <td>petar.petrovic@gmail.com</td>
      <td className="users__buttons">
        <button type="button" className="users__btn users__btn--change">
          <svg
            width="14"
            height="13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.797 2.703 1.28 9.22 1 11.89a.545.545 0 0 0 .61.609l2.671-.281 6.516-6.516-3-3Zm4.851-.445L11.242.852c-.422-.446-1.148-.446-1.594 0L8.336 2.164l3 3 1.312-1.312c.446-.446.446-1.172 0-1.594Z"
              fill="#363535"
            />
          </svg>
          Izmeni
        </button>
        <button type="button" className="users__btn users__btn--delete">
          <svg
            width="11"
            height="13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.375 1.25H7.562L7.329.828A.57.57 0 0 0 6.836.5H4.14a.57.57 0 0 0-.493.328l-.21.422H.624a.385.385 0 0 0-.375.375v.75c0 .21.164.375.375.375h9.75a.385.385 0 0 0 .375-.375v-.75a.403.403 0 0 0-.375-.375ZM1.492 11.445c.024.61.516 1.055 1.125 1.055H8.36c.61 0 1.102-.445 1.125-1.055L10 3.5H1l.492 7.945Z"
              fill="#fff"
            />
          </svg>
          Obriši
        </button>
      </td>
    </tr>
  );
}

export default UserItem;
