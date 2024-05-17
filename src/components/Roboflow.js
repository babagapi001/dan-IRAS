const RoboflowDetection = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
        {/* Live Stream Section */}
        <div style={{ flex: 1, position: 'relative', marginRight: '10px', textAlign:'-webkit-center', }}>
          <div style={{
            background: 'white',
            height: 'auto',
            width: 'auto',
            minHeight: '500px',
            alignContent: 'center',
            borderRadius: '8px',
            maxWidth: '670px',
            margin: '50px',
          }}>
          <iframe src="inference.html" style={{
            minWidth: '620px',
            minHeight: '500px',
            margin: '20px',
            borderRadius: '8px',
            maxWidth: '620px',
            maxHeight: '500px'
          }} ></iframe>
          </div>
        
        </div>
        <div style={{ flex: 1, position: 'relative', marginRight: '10px', textAlign:'-webkit-center', }}>
          <div style={{
            background: 'white',
            height: 'auto',
            width: 'auto',
            minHeight: '500px',
            alignContent: 'center',
            borderRadius: '8px',
            maxWidth: '670px',
            margin: '50px',
          }}>
          <iframe allow="camera" src="http://localhost/testcap/testcap.php" 
        style={{
          minWidth: '620px',
          minHeight: '500px',
          margin: '20px',
          borderRadius: '8px',
          maxWidth: '620px',
          maxHeight: '500px'
        }}>
</iframe>
"
          </div>
        
        </div>
      
      
      </div>
  );
};

export default RoboflowDetection;