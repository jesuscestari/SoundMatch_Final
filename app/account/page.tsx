import Header from "../(site)/components/Header";
import AccountContent from "./components/AccountContent";

const Account = () => {
  return (
    <div
      className="
        bg-gray-900 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header className="from-bg-gray-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default Account;
