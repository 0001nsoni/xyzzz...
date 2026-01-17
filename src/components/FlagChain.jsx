import './FlagChain.css';

const FlagChain = ({ position = 'left' }) => {
    return (
        <div className={`flag-chain flag-chain-${position}`}>
            <div className="flag"></div>
            <div className="flag"></div>
            <div className="flag"></div>
            <div className="flag"></div>
            <div className="flag"></div>
            <div className="flag"></div>
            <div className="flag"></div>
            <div className="flag"></div>
        </div>
    );
};

export default FlagChain;
