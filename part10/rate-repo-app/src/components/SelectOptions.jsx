import { FlatList, View, StyleSheet } from 'react-native'
import { Typography } from './Typography.styles'

const SelectHeader = ({ selectLabel }) => {
  return (
    <Typography variant="caption" sx={styles.listHeaderText} onPress={() => ''}>
      {selectLabel}
    </Typography>
  )
}

const SelectOptions = ({ data, onSelect, selectLabel }) => {

  const handleItemSelection = (item) => {
    onSelect(item)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Typography
            key={item.label}
            variant="body2"
            sx={styles.listItemText}
            onPress={() => handleItemSelection(item.value)}
          >
            {item.label}
          </Typography>
        )}
        ListHeaderComponent={<SelectHeader selectLabel={selectLabel} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  listItemText: {
    margin: '2%',
  },
  listHeaderText: {
    margin: '2%',
    color: 'dimgray',
  },
})

export default SelectOptions
