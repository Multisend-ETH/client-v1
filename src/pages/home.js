import React from "react";
import TopBar from "../components/topBar";
import Intro from "../components/intro";
import Divider from "../components/divider";
import Workings from "../components/workings";
import Footer from "../components/Footer";
import BuiltWith from "../components/BuiltWith";

export default () => (
  <main className="home">
    <TopBar />
    <Intro />
    <Divider />
    <Workings />
    <Divider />
    <BuiltWith />
    <Divider />
    <Footer />
  </main>
);
