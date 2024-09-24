/* eslint-disable */

import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id: cabinId,
    image,
    maxCapacity,
    name,
    regular_price,
    discount,
  } = cabin;

  // By using "useQueryClient" hook we can access the querClient instance
  const queryClient = useQueryClient();

  // This is used for mutating the values of the remote state (database datas)
  const {
    isLoading: isDeleting,
    mutate /*  mutate is just a callback function that we can connect with the button */,
  } = useMutation({
    mutationFn: deleteCabin /* or (cabinId) => deleteCabin(cabinId) */,
    /* This is the function that react query will call */ // This will tell react query what to do as soon as mutation was successful
    // Here, we will invalid the cache to re-fetch the data
    onSuccess: () => {
      queryClient.invalidateQueries({
        // This data with "cabins" as queryKey will be invalidate
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits upto {maxCapacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>

      <Discount>{formatCurrency(discount)}</Discount>
      <div>
        <button onClick={() => setShowForm((show) => !show)}>Edit</button>
        <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
          Delete
        </button>
      </div>
    </TableRow>
  );
}

export default CabinRow;
