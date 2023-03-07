import { FlatList, Text } from 'react-native'

const SelectHeader = ({ selectLabel }) => {
  return (
    <Text>{selectLabel}</Text>
  )
}

const SelectList = ({ data, returnValue, selectLabel }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Text key={item.label} onPress={() => returnValue(item)}>
          {item.label}
        </Text>
      )}
      ListHeaderComponent={<SelectHeader selectLabel={selectLabel} />}
    />
  )
}

export default SelectList
