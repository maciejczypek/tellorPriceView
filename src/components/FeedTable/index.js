import React, { useEffect, useState, Fragment } from "react";
import { Table, Button, Modal, Input, Alert, notification } from "antd";
import axios from "axios";
import _ from "lodash";
import getWeb3 from "utils/getWeb3";
import PSRs from "utils/psr";
import TellorFund from "utils/contracts/TellorFund";
import Lottie from "react-lottie";
import animationData from "../../assets/Tellor__Loader.json";

const { Column } = Table;

const contractAddress = "0xFe41Cb708CD98C5B20423433309E55b53F79134a"; //"0xc47d2339077F5aC117dD1B2953D5c54a0c0B89fa, 0xFe41Cb708CD98C5B20423433309E55b53F79134a";

export default () => {
  const [priceLoading, setPriceLoading] = useState(true);
  const [totalTipsLoading, setTotalTipsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [contract, setContract] = useState(false);
  const [tip, setTip] = useState(false);
  const [visible, setVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedID, setSelectedID] = useState(undefined);
  const [isMetamask, setIsMetaMask] = useState(false);
  useEffect(() => {
    const apiPromises = [];
    const priceAPIPromises = [];
    let tempTableData = [...tableData];
    async function web3Connect() {
      try {
        const web3 = await getWeb3();
        setIsMetaMask(web3.currentProvider.isMetaMask);
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        const instance = await new web3.eth.Contract(
          TellorFund.abi,
          contractAddress
        );
        setContract(instance);

        PSRs.map((type) =>
          tempTableData.push({
            type,
          })
        );
        setTableData(tempTableData);
        PSRs.map((item, index) => {
          apiPromises.push(
            new Promise((resolve, reject) => {
              axios
                .get(`http://api.tellorscan.com/requestinfo/${index + 1}`)
                .then((res) => {
                  resolve(res);
                });
            })
          );
          priceAPIPromises.push(
            new Promise((resolve, reject) => {
              axios
                .get(`http://api.tellorscan.com/price/${index + 1}`)
                .then((res) => {
                  resolve(res);
                });
            })
          );
        });
        Promise.all(apiPromises).then(function(values) {
          const totalTips = [..._.map(values, "data")];
          totalTips.map((tipObj, index) => {
            tempTableData[index].totalTip = tipObj.totalTip;
            tempTableData[index].granularity = tipObj.granularity;

            return tempTableData[index];
          });

          setTableData(tempTableData);
          setTotalTipsLoading(false);
        });
        Promise.all(priceAPIPromises).then((values) => {
          const prices = [..._.map(values, "data")];
          prices.map((priceObj, index) => {
            tempTableData[index].price = priceObj.value;
            tempTableData[index].granPrice =
              +priceObj.value / +tempTableData[index].granularity;

            return tempTableData[index];
          });
          setTableData(tempTableData);
          setPriceLoading(false);
        });
      } catch (e) {
        alert(
          `Failed to load web3, be sure to be connected to the right Metamask network and reload teh browser!`
        );
        console.error(e);
      }
    }

    //web3Connect();


  }, []);

  const showModal = (index) => {
    if (isMetamask) {
      setSelectedID(index + 1);
      setVisible(true);
    } else {
      notification["warning"]({
        message: "Metamask not found",
        description: "Please install metamask on the browser!",
      });
    }
  };

  const handleOk = (e) => {
    if (tip >= 0) {
      contract.methods
        .addTip(selectedID, tip)
        .send({
          from: accounts[0],
          to: contractAddress,
        })
        .then((res) => {
          console.log("response: ", res);
        });
      setVisible(false);
    } else {
    }
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (totalTipsLoading || priceLoading)
    return <Lottie options={lottieOptions} height={120} width={120} />;

  return (
    <Fragment>
      <Table dataSource={tableData} bordered pagination={false} rowKey="type">
        <Column title="Type" dataIndex="type" key="type" />
        <Column title="Last Value" dataIndex="price" key="price" />
        <Column title="Price" dataIndex="granPrice" key="granPrice" />
        <Column title="Current Tip" dataIndex="totalTip" key="totalTip" />
        <Column
          title=""
          key="action"
          align="right"
          render={(text, record, index) => (
            <Fragment>
              <Button
                type="primary"
                size="small"
                onClick={() => showModal(index)}
              >
                + Add Tip
              </Button>
            </Fragment>
          )}
        />
      </Table>
      <Modal
        title="Input Tip"
        visible={visible}
        footer={[
          <Button key="back" type="default" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        {tip < 0 && (
          <Alert
            message="Tip should be larger than 0"
            type="error"
            style={{ marginBottom: 10 }}
          />
        )}
        <Input
          placeholder="Amount of TRB "
          onChange={(e) => setTip(e.target.value)}
        />
      </Modal>
    </Fragment>
  );
};
