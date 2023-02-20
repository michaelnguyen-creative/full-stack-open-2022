import { View, Text, Image, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    // flexGrow: 0
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 5
  },
  fullName: {
    fontWeight: theme.fontWeights.bold,
    fontSizes: theme.fontSizes.subheading,
  },
  language: {
    backgroundColor: theme.colors.background.primary,
    color: theme.colors.text.light.primary,
    borderRadius: 5,
    padding: 3,
    fontSize: 14,
    textAlign: 'center',
  },
})

const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
  } = item

  // Good enough, edge case:
  // console.log(displayItemInfo(21015))
  const formatCount = (number) => {
    if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`
    }
    return JSON.stringify(number)
  }

  return (
    <View style={{ padding: '5%', width: 375, gap: 15 }}>
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 15  }}>
        <View>
          <Image source={ownerAvatarUrl} style={styles.avatar} />
        </View>
        <View style={{ flexDirection: 'column', gap: 5, width: '80%', alignItems: 'flex-start',  }}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={{ fontSize: 12, flexWrap: 'wrap' }}>{description}</Text>
          <Text style={styles.language}>{language}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
        <View style={{ flexGrow: 0, alignItems: 'center' }}>
          <Text>{formatCount(stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={{ flexGrow: 0, alignItems: 'center' }}>
          <Text>{formatCount(forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={{ flexGrow: 0, alignItems: 'center' }}>
          <Text>{formatCount(reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={{ flexGrow: 0, alignItems: 'center' }}>
          <Text>{formatCount(ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
