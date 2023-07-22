import React, { Fragment, useEffect } from "react";
import * as Switcherdata from "../../../shared/data/switcherdata/switcherdata";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button } from "react-bootstrap";
import Link from "next/link"
import {connect} from "react-redux"
import {useRouter} from "next/router"
import { SwitcherAction,changePrimaryColor,darkPrimaryColor } from "../../redux/actions";

function Switcher({SwitcherAction,changePrimaryColor,darkPrimaryColor}) {
  const router = useRouter()
  useEffect(() => {
    Switcherdata.localStorageBackUp();
  }, [])
  return (
    <Fragment>
     
      {/* <!-- End Switcher --> */}
    </Fragment>
  );
}

Switcher.propTypes = {};

Switcher.defaultProps = {};

const mapStateToProps = (state) => ({
  local_Products : state
})
export default connect(mapStateToProps,{SwitcherAction,changePrimaryColor,darkPrimaryColor})(Switcher);
