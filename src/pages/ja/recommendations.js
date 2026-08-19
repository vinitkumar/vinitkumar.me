import React from "react"

import Recommendations, {
  Head as RecommendationsHead,
} from "../recommendations"

export default Recommendations

export const Head = (props) => <RecommendationsHead {...props} />
