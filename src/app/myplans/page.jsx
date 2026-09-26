import MyPlans from "../components/MyPlans";

const MyPlansPage = async ({ searchParams }) => {
  const { view } = await searchParams;
  const initialCollection = view === "saved" ? "saved" : "plan";

  return <MyPlans key={initialCollection} initialCollection={initialCollection} />;
};

export default MyPlansPage;