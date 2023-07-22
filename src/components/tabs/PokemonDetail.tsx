import React, {JSX, useCallback, useEffect, useMemo, useRef} from "react";
import BottomSheet, {BottomSheetModalProvider, BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedPokemon} from "../../redux/actions";
import {ISelectionReducerStore} from "../../redux/reducers/selection";

interface IPokemonDetail {
}


const PokemonDetail = ({}: IPokemonDetail): JSX.Element => {
    const dispatch = useDispatch()
    const {selectedPokemon} = useSelector((state: ISelectionReducerStore) => state.selection)
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (bottomSheetRef.current !== null) {
            if (selectedPokemon !== null) {
                bottomSheetRef.current.snapToIndex(1, {duration: 750})
            } else {
                bottomSheetRef.current.forceClose({duration: 500})
            }
        }
    }, [selectedPokemon, bottomSheetRef])
    // variables
    const snapPoints = useMemo(() => ['50%', '50%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            dispatch(setSelectedPokemon(null))
        }
    }, []);


    return <BottomSheetModalProvider>
        <BottomSheet
            backdropComponent={() => <View
                style={[
                    {
                        borderTopLeftRadius: 60, borderTopRightRadius: 60
                    }
                ]}
            />}
            style={{zIndex: 4}}
            containerStyle={{zIndex: 4}}
            enablePanDownToClose
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            </BottomSheetScrollView>
        </BottomSheet>
    </BottomSheetModalProvider>
}


const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60
    },
});

export {PokemonDetail}
