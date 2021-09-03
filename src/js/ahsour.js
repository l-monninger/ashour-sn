// Implementation of Ashour approximation: https://www.sciencedirect.com/science/article/pii/S209012321000069X#:~:text=Azzalini%20%5B1%5D%20defined%20the%20skew,the%20following%20form%3A%20g%20(%20z

const ashourNeg3Neg1 = (x, lambda)=>{

    const lx = lambda*x;

    return (
        ( Math.pow(Math.E, -Math.pow(x,2)/2) *
            ((9 * lx) + (3 * lx * lx) + (.333 * lx * lx * lx) + 9)
         ) /
         ( 8* Math.sqrt(Math.PI) )

    )

}

const ashourNeg1Pos1 = (x, lambda)=>{
    
    const lx = lambda*x;

    return (
        ( Math.pow(Math.E, -Math.pow(x,2)/2) *
            ((3 * lx) - (.333 * lx * lx * lx) + 4)
         ) /
         ( 4* Math.sqrt(Math.PI) )

    )
}

const ashourPos1Pos3 = (x, lambda)=>{
    
    const lx = lambda*x;

    return (
        ( Math.pow(Math.E, -Math.pow(x,2)/2) *
            ((9 * lx) - (3 * lx * lx) + (.333 * lx * lx * lx) + 7)
         ) /
         ( 8* Math.sqrt(Math.PI) )
    )
}

const ashourGtrPos3 = (x , lambda)=>{
    return (
        (Math.sqrt(2/Math.PI) ) *
        (Math.pow(Math.E, -Math.pow(x,2)/2))
    )
}

const ashourApproximation = (x, lambda)=>{

    if( x < (-3/lambda) ){
        return 0;
    } else if ( x < (-1/lambda) ){
        return ashourNeg3Neg1(x, lambda);
    } else if ( x < (1/lambda)){
        return ashourNeg1Pos1(x, lambda);
    } else if ( x < (3/lambda)){
        return ashourPos1Pos3(x, lambda);
    } else {
        return ashourGtrPos3(x, lambda);
    }

}

const ashourApproximationMode = (lambda)=>{

    return 

}

const ashourApproximateMax = (lambda)=>{

    return ashourApproximation(0, lambda);

}

const computeRangeStandardDeviation = (range)=>{
    return range/Math.sqrt(range)
}

const computePosZ = (pos, range, mu=0)=>{

    return ((pos - mu - (range/2)))/computeRangeStandardDeviation(range);
}

const computeCapacityFromNormalWithSkew = (skew, max, range, pos, shift=0)=>{

    const mu = shift - (range/2);
    const z = skew < 0 ? -computePosZ(pos, range, mu) : computePosZ(pos, range, mu);
    const realSkew = skew < 0 ? 0 - skew : skew;
    const factor = 1/(ashourApproximateMax(realSkew));
    return Math.floor(factor * max * ashourApproximation(z, realSkew));


}
