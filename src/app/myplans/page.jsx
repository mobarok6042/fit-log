import MyPlans from "../components/MyPlans";

export const metadata = {
  title: "My Plans",
};

const MyPlansPage = async ({ searchParams }) => {
  const { view } = await searchParams;
  const initialCollection = view === "saved" ? "saved" : "plan";

  return <MyPlans key={initialCollection} initialCollection={initialCollection} />;
};

export default MyPlansPage;